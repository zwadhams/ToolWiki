import subprocess


def show_name(name):
    subprocess.run("echo " + name, shell=True, check=True)
