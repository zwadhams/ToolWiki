import subprocess
import sys


def show_name(name):
    subprocess.run([sys.executable, "-c", "import sys; print(sys.argv[1])", name], shell=False, check=True)
