frappe.ui.form.on("Purchase Invoice", {
	after_save: function (frm) {
        //Checks default expense account: If expense account equals to default   
        // account then changes income account based on Purchase and tax charges template.
        frappe.call('invoice_incomeacc.util.get_default_expense_account', {
            company: frm.doc.company
        }).then(r => {
            console.log(r.message);
            let default_expense_account = r.message;
            let expense_account = "";

            if (frm.doc.taxes_and_charges) {
               
                frappe.call('invoice_incomeacc.util.get_expense_account', {
                    company: frm.doc.company,
                    purchase_tax_t: frm.doc.taxes_and_charges,

                }).then(r => {
                    console.log(r.message);
                    expense_account = r.message;
                    let i = 0
                    for (; i < frm.doc.items.length; i++) {
                        console.log(expense_account);
                        if (default_expense_account === frm.doc.items[i].expense_account) {
                            frm.doc.items[i].expense_account = expense_account;
                        }
                    }
                });
            };
        });

    },
	
});