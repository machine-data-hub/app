---
title: Machine Data Hub Tutorial
date: May 2, 2021
author: Cecilia Barnes
img: https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1532&q=80
---
---
# Remaining Useful Life Prediction
Remaining Useful Life prediction can be highly useful in maintenence of machines. Today, we will be using data from NASA's Turbofan Engine Degradation Simulation to build a model that predicts how many cycles are left in the jet engines life before failure. The general workflow will be:
- use the Machine Data Hub command line package to download the data
- process and clean the data
- do some dimensionality reduction
- make predictive models
- assess model accuracy and performance

## Using MDH Command Line to Get Data

First, we'll install the Machine Data Hub package
- type `pip install mdh` into your terminal

Then, we need to get our dataset. Let's find what ID our dataset has in order to download it. We want to use NASA's Turbofan Engine Degradation Simulation Dataset.
- type `mdh list` to view the datasets and their ID's

We can see the dataset we want has an ID of 9. It also tell us that there are 2 available files. Now we can download the data (make sure you're in a directory where you want the data files to be)
- type `mdh download 9` to download both files


```python
import pandas as pd
import numpy as np
```

# Reading in the data
First, let's look at the readme.txt file for some context about the data.


```python
f = open('CMAPSSData/readme.txt', 'r', errors='ignore')
file_contents = f.read()
print(file_contents)
f.close()
```

    Data Set: FD001
    Train trjectories: 100
    Test trajectories: 100
    Conditions: ONE (Sea Level)
    Fault Modes: ONE (HPC Degradation)
    
    Data Set: FD002
    Train trjectories: 260
    Test trajectories: 259
    Conditions: SIX 
    Fault Modes: ONE (HPC Degradation)
    
    Data Set: FD003
    Train trjectories: 100
    Test trajectories: 100
    Conditions: ONE (Sea Level)
    Fault Modes: TWO (HPC Degradation, Fan Degradation)
    
    Data Set: FD004
    Train trjectories: 248
    Test trajectories: 249
    Conditions: SIX 
    Fault Modes: TWO (HPC Degradation, Fan Degradation)
    
    
    
    Experimental Scenario
    
    Data sets consists of multiple multivariate time series. Each data set is further divided into training and test subsets. Each time series is from a different engine  i.e., the data can be considered to be from a fleet of engines of the same type. Each engine starts with different degrees of initial wear and manufacturing variation which is unknown to the user. This wear and variation is considered normal, i.e., it is not considered a fault condition. There are three operational settings that have a substantial effect on engine performance. These settings are also included in the data. The data is contaminated with sensor noise.
    
    The engine is operating normally at the start of each time series, and develops a fault at some point during the series. In the training set, the fault grows in magnitude until system failure. In the test set, the time series ends some time prior to system failure. The objective of the competition is to predict the number of remaining operational cycles before failure in the test set, i.e., the number of operational cycles after the last cycle that the engine will continue to operate. Also provided a vector of true Remaining Useful Life (RUL) values for the test data.
    
    The data are provided as a zip-compressed text file with 26 columns of numbers, separated by spaces. Each row is a snapshot of data taken during a single operational cycle, each column is a different variable. The columns correspond to:
    1)	unit number
    2)	time, in cycles
    3)	operational setting 1
    4)	operational setting 2
    5)	operational setting 3
    6)	sensor measurement  1
    7)	sensor measurement  2
    ...
    26)	sensor measurement  26
    
    
    Reference: A. Saxena, K. Goebel, D. Simon, and N. Eklund, Damage Propagation Modeling for Aircraft Engine Run-to-Failure Simulation, in the Proceedings of the Ist International Conference on Prognostics and Health Management (PHM08), Denver CO, Oct 2008.
    
    

## Remaining useful life for each unit
Next, lets read in the file with values of remaining useful life (target) for each unit in test data. We will just look at the first simulation, FD001.


```python
RUL = pd.read_csv('CMAPSSData/RUL_FD001.txt', header=None)
RUL.columns = ['RUL']
RUL.head()
```

|             | RUL         |
| ----------- | ----------- |
| 0           | 112         |
| 1           | 98          |
| 2           | 69          |
| 3           | 82          |
| 4           | 91          |


## Training Data
Now we'll read in the simulation data. In this training set, the fault grows in magnitude until system failure (run-to-failure data).


```python
train = pd.read_csv('CMAPSSData/train_FD001.txt', sep=" ", header=None)
train.columns = ['unit', 'cycle', 'op1', 'op2','op3','sm1','sm2','sm3','sm4','sm5','sm6','sm7','sm8','sm9','sm10','sm11','sm12','sm13','sm14','sm15','sm16','sm17','sm18','sm19','sm20','sm21','sm22','sm23']
train = train.iloc[:, :26]
units = train['unit']
train.head()
```

## Test Data
Last, we'll get the test set. In the test set, the time series ends some time prior to system failure.


```python
test = pd.read_csv('CMAPSSData/test_FD001.txt', sep=" ", header=0)
cols = pd.DataFrame(test.columns)
test = test.reset_index()
test = test.iloc[:, :26]
test.columns = ['unit', 'cycle', 'op1', 'op2','op3','sm1','sm2','sm3','sm4','sm5','sm6','sm7','sm8','sm9','sm10','sm11','sm12','sm13','sm14','sm15','sm16','sm17','sm18','sm19','sm20','sm21']
test.head()
```



# Data Processing
#### Looking at range of life cycles each unit ran
Looking at these values will give us a general idea of the cycles the jet engines ran.


```python
max_life = max(train.groupby("unit")["cycle"].max())
min_life = min(train.groupby("unit")["cycle"].max())
mean_life = np.mean(train.groupby("unit")["cycle"].max())
max_life,min_life,mean_life
```




    (362, 128, 206.31)



## Setting up X and y in training and testing data
#### Setting up Remaining Useful Life variable (y)
The data gives us measurements from each cycle counting up, but we want the remaining useful life, or the cycles left before failure.
In order to set up the data to have remaining cycles left, we will reverse the cycles column so that instead of counting up, it's counting down until failure. This will ultimately be our y variable.


```python
## reversing remaining useful life column so that it counts down until failure
grp = train["cycle"].groupby(train["unit"])
rul_lst = [j for i in train["unit"].unique() for j in np.array(grp.get_group(i)[::-1])] # can be used as y or target for training
```

#### Setting up sensor measurements (X)
Since we are predicting remaining useful life, we don't want that column in our X data, so we remove it.


```python
# getting all columns except target RUL column as X
train_x = train.drop("cycle", axis=1)
test_x = test.drop("cycle", axis=1)
```

## Applying Principal Component Analysis
We are applying Principal Component Analysis (PCA) in order to avoid overfitting due to the large number of features in the dataset. PCA reduces the dimensionality of the data. Here, we are setting PCA to choose the # of features that explain 95% of the variance in the data.


```python
from sklearn.decomposition import PCA
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import PowerTransformer
from sklearn.model_selection import train_test_split, cross_val_score
```

### Fitting PCA and transforming train and test sets
- First, we are setting the "unit" column to be the index of the dataframe for the train and test sets. This is because "unit" is not a feature that will be used to make predictions, so we don't want it to be used in PCA either.
- Next, we scale the data. We fit the scaler on the training set, and transform both training and testing sets with the same scaler.
- Next, we do PCA on the data. We fit the PCA on the training set, and transform both training and testing sets with the same PCA.
- Last, we save the results of PCA as dataframes.


```python
# PCA on training data

# setting index to be unit so unit is not used as a column in PCA
train_data = train_x.set_index("unit")
test_data = test_x.set_index("unit")

# scaling the data
gen = MinMaxScaler(feature_range=(0, 1))
train_x_rescaled = gen.fit_transform(train_data)
test_x_rescaled = gen.transform(test_data)

# PCA
pca = PCA(n_components=0.95) # 95% of variance
train_data_reduced = pca.fit_transform(train_x_rescaled)
test_data_reduced = pca.transform(test_x_rescaled)

# save results as dataframes
train_df = pd.DataFrame(train_data_reduced)
test_df = pd.DataFrame(test_data_reduced)
```

## Making Complete Dataframe
This dataframe is the same as x_train, but the features have been scaled and PCA has been applied. You'll see that this dataframe only has 10 feature columns whereas x_train, the data we initially loaded, had 21 feature coumns. Additionally, now we have an "RUL" or remaining useful life column instead of "cycle" that counts down to failure instead of counting up cycles so that our model's output is more intuitive. 

We will use this dataframe to split into train and validate sets.


```python
# making dataframe with unit, RUL counting down instead of up, and PCA features
train_df.insert(0, "Unit", units, True)
train_df.insert(1, "RUL", rul_lst, True)
train_df.head()
```




## Splitting into Train and Validate Sets
First, we will split up the data randomly by units. We don't want random rows of units being selected for train and validate sets, but rather want to keep all the data for each unit together.


```python
import random
```

### Splitting up units randomly
Here, we get a list of all unique units (a list from 1-100) and shuffle it. Then, to do an 80-20 train-validate split, we get the first 80 units of the shuffled list and store them as training units, and then get the last 20 units of the shuffled list and store them as validation units.


```python
unique_units = train_df["Unit"].unique().tolist()
np.random.seed(200)
random.shuffle(unique_units)
train_units = unique_units[:80]
val_units = unique_units[80:]
```

### Setting up train and validate sets
Now, we want to use the new train_df dataframe that we made to get our X and y, and from there, split its rows into train and validate data.

X will be all columns except the Remaining Useful Life (RUL) column, and y will be just the RUL column.


```python
X = train_df.iloc[:,train_df.columns != 'RUL']
y = train_df[["Unit", "RUL"]]

# splitting into train and test data based on units rather than random split
X_train = X[X['Unit'].isin(train_units)] # getting first 80 units
X_validate = X[X['Unit'].isin(val_units)] # getting last 20 units
y_train = y[y['Unit'].isin(train_units)]["RUL"] # getting first 80 units
y_validate = y[y['Unit'].isin(val_units)]["RUL"] # getting last 20 units

X_train = X_train.set_index('Unit')
X_validate = X_validate.set_index('Unit')
```

# Making Predictions
Here, we will train a few different models and see how well they can predict the remaining useful life.
Our process for each model is as follows:
- Split up training data into train and validate sets based on their unit
- Train model on the training set
- Use model to predict RUL on validation set
- Assess model accuracy

## Linear Regression Model


```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import matplotlib.pyplot as plt
```

### Fitting the model


```python
reg = LinearRegression()
reg.fit(X_train, y_train)
y_hat = reg.predict(X_validate)
```

### Assessing Performance


```python
print('Training Cross Validation Score: ', cross_val_score(reg, X_train, y_train, cv=5))
print('Validation Cross Validation Score: ', cross_val_score(reg, X_validate, y_validate, cv=5))
print('Validation R^2: ', r2_score(y_validate, y_hat))
print('Validation MSE: ', mean_squared_error(y_validate, y_hat))
```

    Training Cross Validation Score:  [0.61888783 0.51910232 0.52509406 0.50398413 0.54484442]
    Validation Cross Validation Score:  [0.62130808 0.70276807 0.6365071  0.58836818 0.65409291]
    Validation R^2:  0.6441113493820093
    Validation MSE:  1210.5676649503364
    

### Plotting Predicted vs True Values
Ideally, all values would be close to a regressed diagonal line and fairly symmetric.


```python
_ = plt.scatter(y_hat, y_validate)
_ = plt.xlabel("Predicted Remaining Useful Life")
_ = plt.ylabel("True Remaining Useful Life")
```


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProj/output_37_0.png?raw=true)


This plot shows a clear curve in the data which suggests we may be able to transform the data to get better performance. Let's try taking the log of the RUL to fix this.


```python
log_y_train = np.log(y_train)
log_y_validate = np.log(y_validate)
reg.fit(X_train, log_y_train)
y_hat = reg.predict(X_validate)
#log_y_train.isna().sum()
```


```python
print('Training Cross Validation Score: ', cross_val_score(reg, X_train, y_train, cv=5))
print('Validation Cross Validation Score: ', cross_val_score(reg, X_validate, log_y_validate, cv=5))
print('Validation R^2: ', r2_score(log_y_validate, y_hat))
print('Validation MSE: ', mean_squared_error(log_y_validate, y_hat))
```

    Training Cross Validation Score:  [0.6843762  0.48298152 0.52494506 0.49042283 0.53431165]
    Validation Cross Validation Score:  [0.74860496 0.82045964 0.75158326 0.7985775  0.74473338]
    Validation R^2:  0.7850075068462503
    Validation MSE:  0.19969205333878723
    


```python
_ = plt.scatter(y_hat, log_y_validate)
_ = plt.xlabel("Predicted Remaining Useful Life")
_ = plt.ylabel("True Remaining Useful Life")
```


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProj/output_41_0.png?raw=true)


As you can tell, after the transformation of the data, we got a much more reasonable plot along the diagonal.

## Decision Tree Regressor
Let's try another model to see if it performs better.
### Fitting the model


```python
# trying decision tree regressor
from sklearn.tree import DecisionTreeRegressor

dt_reg = DecisionTreeRegressor()
dt_reg.fit(X_train, y_train)
y_hat = dt_reg.predict(X_validate)
```

### Assessing Performance


```python
print('Training Cross Validation Score: ', cross_val_score(dt_reg, X_train, y_train, cv=5))
print('Validation Cross Validation Score: ', cross_val_score(dt_reg, X_validate, y_validate, cv=5))
print('Validation R^2: ', r2_score(y_validate, y_hat))
print('Validation MSE: ', mean_squared_error(y_validate, y_hat))
```

    Training Cross Validation Score:  [ 0.28143897 -0.22866613  0.19483353  0.25713716  0.2325802 ]
    Validation Cross Validation Score:  [0.34024985 0.52856838 0.53486471 0.44669762 0.37379607]
    Validation R^2:  0.08818845235594164
    Validation MSE:  3101.5587998928477
    

### Plotting Predicted vs True Values


```python
_ = plt.scatter(y_hat, y_validate)
_ = plt.xlabel("Predicted Remaining Useful Life")
_ = plt.ylabel("True Remaining Useful Life")
```


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProj/output_48_0.png?raw=true)


While this plot is symmetric, after 50 or so cycles it it's performance drastically decreases. Let's try using the transformed data like we did with linear regression.


```python
dt_reg.fit(X_train, log_y_train)
y_hat = dt_reg.predict(X_validate)
print('Training Cross Validation Score: ', cross_val_score(dt_reg, X_train, log_y_train, cv=5))
print('Validation Cross Validation Score: ', cross_val_score(dt_reg, X_validate, log_y_validate, cv=5))
print('Validation R^2: ', r2_score(log_y_validate, y_hat))
print('Validation MSE: ', mean_squared_error(log_y_validate, y_hat))
_ = plt.scatter(y_hat, log_y_validate)
_ = plt.xlabel("Predicted Remaining Useful Life")
_ = plt.ylabel("True Remaining Useful Life")
```

    Training Cross Validation Score:  [0.72973727 0.6480436  0.68146065 0.66505042 0.69095523]
    Validation Cross Validation Score:  [0.78726213 0.7947421  0.76833736 0.77769533 0.71148907]
    Validation R^2:  0.7183242358854427
    Validation MSE:  0.2616296545367393
    


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProj/output_50_1.png?raw=true)


While the model does better with the transformed data, Linear Regression still has better performance.

## K-Nearest Neighbors Regressor
Let's try one last model to see if it performs better.
### Fitting the Model


```python
from sklearn.neighbors import KNeighborsRegressor
```


```python
kn_reg = DecisionTreeRegressor()
kn_reg.fit(X_train, y_train)
y_hat = kn_reg.predict(X_validate)
```

### Assessing Performance


```python
print('Training Cross Validation Score: ', cross_val_score(kn_reg, X_train, y_train, cv=5))
print('Validation Cross Validation Score: ', cross_val_score(kn_reg, X_validate, y_validate, cv=5))
print('Validation R^2: ', r2_score(y_validate, y_hat))
print('Validation MSE: ', mean_squared_error(y_validate, y_hat))
```

    Training Cross Validation Score:  [ 0.28883114 -0.21458172  0.19487784  0.25546268  0.24428478]
    Validation Cross Validation Score:  [0.34349352 0.5442117  0.51178566 0.44814695 0.38882129]
    Validation R^2:  0.10459372500207498
    Validation MSE:  3045.7556924725423
    

### Plotting Predicted vs True Values


```python
_ = plt.scatter(y_hat, y_validate)
_ = plt.xlabel("Predicted Remaining Useful Life")
_ = plt.ylabel("True Remaining Useful Life")
```


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProj/output_58_0.png?raw=true)


While this plot is symmetric, after 50 or so cycles it it's performance drastically decreases. Let's try using the transformed data like we did with linear regression.


```python
kn_reg.fit(X_train, log_y_train)
y_hat = kn_reg.predict(X_validate)
print('Training Cross Validation Score: ', cross_val_score(dt_reg, X_train, log_y_train, cv=5))
print('Validation Cross Validation Score: ', cross_val_score(dt_reg, X_validate, log_y_validate, cv=5))
print('Validation R^2: ', r2_score(log_y_validate, y_hat))
print('Validation MSE: ', mean_squared_error(log_y_validate, y_hat))
_ = plt.scatter(y_hat, log_y_validate)
_ = plt.xlabel("Predicted Remaining Useful Life")
_ = plt.ylabel("True Remaining Useful Life")
```

    Training Cross Validation Score:  [0.73253373 0.64522721 0.67724421 0.65945721 0.69504003]
    Validation Cross Validation Score:  [0.78597315 0.79044844 0.77744998 0.79253128 0.70937272]
    Validation R^2:  0.7167862091273351
    Validation MSE:  0.2630582240505449
    


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProj/output_60_1.png?raw=true)


While the model does better with the transformed data, Linear Regression still has the best performance.






