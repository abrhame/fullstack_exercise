# backend/app/__init__.py

# Importing modules to make them available when the package is imported
from . import main
from . import database
from .routers import books

# Defining package-level variables
VERSION = '1.0'

# Defining package-level functions or classes
def initialize():
    print("Package initialized!")

