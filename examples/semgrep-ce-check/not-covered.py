import subprocess


def variable_flag(name):
    use_shell = True
    subprocess.run("echo " + name, shell=use_shell, check=True)


def wrapper(name):
    launch("echo " + name)


def launch(command):
    subprocess.run(command)
