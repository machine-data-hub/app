---
title: Remaining Useful Life Tutorial
date: May 3, 2021
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
- type `mdh download 9 1` to download the first file of the 9th dataset


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
test = pd.read_csv('CMAPSSData/test_FD001.txt', sep=" ", header=None)
cols = pd.DataFrame(test.columns)
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
# fitting PCA on training data, transforming training and testing data

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

    Training Cross Validation Score:  [0.65181542 0.60621829 0.56514893 0.52319301 0.51774096]
    Validation Cross Validation Score:  [0.72617618 0.42561359 0.30175429 0.70016344 0.42958844]
    Validation R^2:  0.5254642642582465
    Validation MSE:  2437.895634893165


### Plotting Predicted vs True Values
Ideally, all values would be close to a regressed diagonal line and fairly symmetric.


```python
_ = plt.scatter(y_hat, y_validate)
_ = plt.plot([0, 350], [0, 350], "r")
_ = plt.xlabel("Predicted Remaining Useful Life")
_ = plt.ylabel("True Remaining Useful Life")
```


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProjMarkdown/output_37_0.png?raw=true)


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

    Training Cross Validation Score:  [0.65181542 0.60621829 0.56514893 0.52319301 0.51774096]
    Validation Cross Validation Score:  [0.86189994 0.57916562 0.62127333 0.84606404 0.71891191]
    Validation R^2:  0.7119259657778766
    Validation MSE:  0.2747472045111408



```python
_ = plt.scatter(y_hat, log_y_validate)
_ = plt.plot([0, 6], [0, 6], "r")
_ = plt.xlabel("Predicted Log of Remaining Useful Life")
_ = plt.ylabel("True Log of Remaining Useful Life")
```


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProjMarkdown/output_41_0.png?raw=true)


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

    Training Cross Validation Score:  [0.3314608  0.03284172 0.17224829 0.25248153 0.28469372]
    Validation Cross Validation Score:  [ 0.21143813  0.00097633 -0.03242251  0.25507367 -0.23748143]
    Validation R^2:  0.15272460204742866
    Validation MSE:  4352.820743820744


### Plotting Predicted vs True Values


```python
_ = plt.scatter(y_hat, y_validate)
_ = plt.plot([0, 350], [0, 350], "r")
_ = plt.xlabel("Predicted Remaining Useful Life")
_ = plt.ylabel("True Remaining Useful Life")
```


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProjMarkdown/output_48_0.png?raw=true)


While this plot is symmetric, after 50 or so cycles it it's performance drastically decreases. Let's try using the transformed data like we did with linear regression.


```python
dt_reg.fit(X_train, log_y_train)
y_hat = dt_reg.predict(X_validate)
print('Training Cross Validation Score: ', cross_val_score(dt_reg, X_train, log_y_train, cv=5))
print('Validation Cross Validation Score: ', cross_val_score(dt_reg, X_validate, log_y_validate, cv=5))
print('Validation R^2: ', r2_score(log_y_validate, y_hat))
print('Validation MSE: ', mean_squared_error(log_y_validate, y_hat))
_ = plt.scatter(y_hat, log_y_validate)
_ = plt.plot([0, 6], [0, 6], "r")
_ = plt.xlabel("Predicted Log of Remaining Useful Life")
_ = plt.ylabel("True Log of Remaining Useful Life")
```

    Training Cross Validation Score:  [0.77366425 0.7180512  0.73196486 0.68458347 0.67246177]
    Validation Cross Validation Score:  [0.72003447 0.55813942 0.4954202  0.74433481 0.60379024]
    Validation R^2:  0.680685900000316
    Validation MSE:  0.3045420479245905



![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProjMarkdown/output_50_1.png?raw=true)


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

    Training Cross Validation Score:  [0.33669568 0.06067125 0.19325714 0.25780171 0.29606065]
    Validation Cross Validation Score:  [ 0.19072975 -0.01737705 -0.04616889  0.28963416 -0.31215523]
    Validation R^2:  0.132442225711644
    Validation MSE:  4457.020097020097


### Plotting Predicted vs True Values


```python
_ = plt.scatter(y_hat, y_validate)
_ = plt.plot([0, 350], [0, 350], "r")
_ = plt.xlabel("Predicted Remaining Useful Life")
_ = plt.ylabel("True Remaining Useful Life")
```


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProjMarkdown/output_58_0.png?raw=true)


While this plot is symmetric, after 50 or so cycles it it's performance drastically decreases. Let's try using the transformed data like we did with linear regression.


```python
kn_reg.fit(X_train, log_y_train)
y_hat = kn_reg.predict(X_validate)
print('Training Cross Validation Score: ', cross_val_score(dt_reg, X_train, log_y_train, cv=5))
print('Validation Cross Validation Score: ', cross_val_score(dt_reg, X_validate, log_y_validate, cv=5))
print('Validation R^2: ', r2_score(log_y_validate, y_hat))
print('Validation MSE: ', mean_squared_error(log_y_validate, y_hat))
_ = plt.scatter(y_hat, log_y_validate)
_ = plt.plot([0, 6], [0, 6], "r")
_ = plt.xlabel("Predicted Log of Remaining Useful Life")
_ = plt.ylabel("True Log of Remaining Useful Life")
```

    Training Cross Validation Score:  [0.77184865 0.71060796 0.73260798 0.68050613 0.67374973]
    Validation Cross Validation Score:  [0.72126975 0.55465672 0.50704406 0.7478887  0.59853228]
    Validation R^2:  0.6802101443785232
    Validation MSE:  0.3049957942244644



![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProjMarkdown/output_60_1.png?raw=true)


While the model does better with the transformed data, Linear Regression still has the best performance.

# Trying Our Model On Test Data
Now that we've used the training data to find the best model, it's time to test our model on the test data! Remember, from the documentation we read in at the beginning, "In the test set, the time series ends some time prior to system failure." Let's take a look at the test data to see what we have..


```python
test.head()
```


We also have the correct outputs saved in `RUL`, but if you remember, our best model was fit on the log(y), so we need to transform the correct `RUL` outputs in order to correctly compare our predictions with the true remaining useful life.


```python
# taking log of y values
y_test = np.log(RUL)
```


```python
#test_grp = train["cycle"].groupby(test["unit"])
#test_rul_lst = [j for i in test["unit"].unique() for j in np.array(test_grp.get_group(i)[::-1])]

```

### Using our model to predict RUL for test data
Earlier, when we trained the PCA on the training data, we transformed the test data with it and saved it as `test_df` which is the dataframe we will use as our input, X.


```python
# Test Data with PCA (fit on training data) applied 
test_df.head()
```

Now, we use the model we trained above on the training data to predict the remaining useful life of the test data.


```python
# predict remaining useful life
y_hat_test = reg.predict(test_df)

#make predictions into a dataframe
y_hat_test = pd.DataFrame(y_hat_test)

# add unit column back in so that we know which predictions go with which unit
y_hat_test.insert(0, "unit", test["unit"])
```

Since our model actually makes a prediction for each row of data, we can plot our predictions and see if the remaining useful life plot looks like it is changing for each unit. By plotting the first 400 predictions for each row, it is clear that out model is correctly predicting that for each unit, the remaining useful life is decreasing over time.


```python
_ = plt.plot(y_hat_test[0][0:400])
```


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProjMarkdown/output_72_0.png?raw=true)


Ultimately, we want a prediction output of one value for each unit that tell us the remaining useful life for each unit in the data. Right now, we have one prediction per row of data, and each unit has many rows. To get just one prediction per unit, we will loop through `y_hat_test` dataframe of the predictions, and grab the last prediction for each unit since that will tell us the final number of cycles for the remaining useful life.. 


```python
rul_pred = []

# loop through all units
for each in range(1,101):
    # get data for one unit at a time
    unit_data = y_hat_test[y_hat_test["unit"] == each]
    
    # get last prediction for that unit and add it to the list of predictions
    rul_pred.append(unit_data.tail(1).iloc[0][0])
rul_pred = pd.DataFrame(rul_pred)
```


```python
rul_pred.head()
```


```python
print('Training Cross Validation Score: ', cross_val_score(reg, rul_pred, y_test, cv=5))
print('Validation Cross Validation Score: ', cross_val_score(reg, rul_pred, y_test, cv=5))
print('Validation R^2: ', r2_score(y_test, rul_pred))
print('Validation MSE: ', mean_squared_error(y_test, rul_pred))
```

    Training Cross Validation Score:  [0.47533422 0.82207707 0.66695714 0.80961257 0.80561609]
    Validation Cross Validation Score:  [0.47533422 0.82207707 0.66695714 0.80961257 0.80561609]
    Validation R^2:  0.7423429266648431
    Validation MSE:  0.18018159916559606



```python
_ = plt.scatter(rul_pred, y_test)
_ = plt.plot([0, 6], [0, 6], "r")
_ = plt.xlabel("Predicted Log of Remaining Useful Life")
_ = plt.ylabel("True Log of Remaining Useful Life")
```


![png](https://github.com/PHM-Data-Hub/Examples/blob/main/MLProjMarkdown/output_77_0.png?raw=true)


# Conclusion
In this tutorial, we wanted to be able to predict a machine's remaining useful life given sensor measurements and operational settings over time in cycles. To do this, we read in the data, processed it, split it into training, validation, and test sets, applied dimensionality reduction, and finally ran three different models on the training and validation data. Then, we looked to the model accuracy metrics to decide on a model to move forward with for predictions. When looking at r-squared, linear regression was the best model with an r-squared of 71% compared to 68% for the other two models. When applying our model to the test data, we get an r-squared of 74% which is slightly better performance than it was on the training set. Now you can go forward knowing how many cycle's are left in this simulated engine's life!
