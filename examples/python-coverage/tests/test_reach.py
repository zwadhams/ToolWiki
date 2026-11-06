import unittest

from sample import magnitude, sign


class ReachTests(unittest.TestCase):
    def test_calls_without_checking_results(self):
        sign(-1)
        sign(0)
        magnitude(-2)
