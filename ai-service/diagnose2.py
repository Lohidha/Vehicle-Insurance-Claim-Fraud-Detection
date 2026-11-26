"""
Mimics uvicorn startup path: test importing main as a module from the same CWD.
"""
import sys
import traceback
import os

print(f"CWD: {os.getcwd()}")
print(f"Model dir exists: {os.path.isdir('model')}")

# Add the ai-service directory to sys.path the same way uvicorn does
sys.path.insert(0, os.getcwd())

print("\n=== Importing main module (as uvicorn would via sys.path) ===")
try:
    import main as app_module
    print(f"MODEL_LOADED = {app_module.MODEL_LOADED}")
except Exception as e:
    print(f"MODULE IMPORT ERROR: {e}")
    traceback.print_exc()
