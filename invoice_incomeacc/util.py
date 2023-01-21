import json
from collections import defaultdict

import frappe
from frappe import scrub
from frappe.desk.reportview import get_filters_cond, get_match_cond
from frappe.utils import nowdate, unique

import erpnext
from erpnext.stock.get_item_details import _get_item_tax_template


@frappe.whitelist()
def get_income_account(company,sales_tax_t):
        sales_tax_template = frappe.get_doc("Sales Taxes and Charges Template",sales_tax_t)
        income_account = ""
        for account in sales_tax_template.party_account:
            if account.company == company: 
                income_account= account.account
        return income_account

@frappe.whitelist()
def get_expense_account(company,purchase_tax_t):  
        purchase_tax_template = frappe.get_doc("Purchase Taxes and Charges Template",purchase_tax_t)
        income_account = ""
        for account in purchase_tax_template.party_account:
            if account.company == company: 
                income_account= account.account
        return income_account    

@frappe.whitelist()
def get_default_income_account(company):

	company_doc = frappe.get_doc('Company', company) 
	return company_doc.default_income_account
@frappe.whitelist()
def get_default_expense_account(company):
    
	company_doc = frappe.get_doc('Company', company) 
	return company_doc.default_expense_account               