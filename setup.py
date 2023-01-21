from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in invoice_incomeacc/__init__.py
from invoice_incomeacc import __version__ as version

setup(
	name="invoice_incomeacc",
	version=version,
	description="Auto assign value to income account",
	author="Alimerdan Rahimov",
	author_email="alimerdanrahimov@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
