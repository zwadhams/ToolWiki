"""Bounded local CPU workload for the illustrative py-spy profile."""

import argparse
import time


def busy_work():
    return sum((value * value) % 97 for value in range(20000))


def run(seconds):
    deadline = time.perf_counter() + seconds
    iterations = 0
    checksum = 0
    while time.perf_counter() < deadline:
        checksum = busy_work()
        iterations += 1
    return iterations, checksum


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--seconds', type=float, default=15)
    args = parser.parse_args()
    if not 0 < args.seconds <= 60:
        parser.error('--seconds must be greater than 0 and at most 60')
    iterations, checksum = run(args.seconds)
    print(f'Completed {iterations} iterations; checksum={checksum}')


if __name__ == '__main__':
    main()
