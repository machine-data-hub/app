# Introduction

Machine Data Hub is an open source data hub for locating prognostics and health management data sets for machine learnign reseachers and hobbyists.

## Documentation

Use the package [pip](https://github.com/PHM-Data-Hub/lib/) to install [our Python client](https://machine-data-hub.readthedocs.io/en/latest/?badge=latest). 

```bash
pip install machinedatahub
```

## Contributing
Please read our contributing guidelines [here](https://github.com/machine-data-hub/app/blob/main/CONTRIBUTING.md).
Pull requests welcomed!

## License
[MIT](https://github.com/PHM-Data-Hub/app/blob/main/LICENSE)


## GitHub Tree
.
└-- machine-data-hub/
    +-- app: web application/
    |   +-- _blogcontent: Markdown files for blog
    |   +-- components: React components
    |   +-- context: filtering contexts
    |   +-- data: JSON files for rendering text and cards
    |   +-- lib: scripts for posting to GitHub
    |   +-- pages: Website pages
    |   +-- public: Images and datasets for Python package
    |   +-- styles: Global CSS file
    |   +-- utils: Sorting scripts
    |   +-- CODE_OF_CONDUCT: Code of Conduct
    |   +-- CONTRIBUTING: Rules for contributing to Machine Data Hub
    |   +-- LICENSE: MIT license
    |   +-- README: Introductory file
    |   +-- netlify.toml: Loader for Netlify deploys
    |   +-- package-lock.json: Dependencies
    |   └-- package.json: Dependencies
    +-- lib: Python package/
    |   +-- .idea: 
    |   +-- .github: Workflows
    |   +-- .vscode: Settings
    |   +-- src: Commands user calls
    |   +-- docs: Sphinx documentation
    |   +-- test: Files for testing package
    |   +-- LICENSE: MIT license
    |   +-- README: Introductory file
    |   +-- noxfile.py: Script to automate testing
    |   +-- poetry.toml: Dependencies
    |   └-- poetry.lock: Asserts dependencies versions
    +-- Roadmap: Goals for Machine Data Hub
    +-- binder-examples: Runnable Python notebooks that open on Binder
    +-- Examples -- Outdated
    +-- ml-examples -- Outdated
    +-- jiwoo-ML -- Outdated
    └-- react -- Outdated
