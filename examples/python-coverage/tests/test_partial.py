import unittest

from sample import sign


class PartialTests(unittest.TestCase):
    def test_negative(self):
        self.assertEqual(sign(-1), "negative")
