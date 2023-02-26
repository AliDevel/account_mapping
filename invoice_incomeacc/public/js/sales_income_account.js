frappe.ui.form.on("Sales Invoice", {
    onload: function (frm) {
        //Based on logged user Gets his full name and from full name finds Sales person -> adds to sales team tables 
        if (!frm.doc.sales_team) {
        var child = frm.add_child("sales_team");
				child.sales_person = frappe.user_info().fullname
				child.allocated_percentage = "100"
			    frm.refresh_field('sales_team')}

    } ,
    after_save: function (frm) {
        //Checks default account: If income account equals to default   
        // acount then changes income account based on Sales and tax charges template.
        frappe.call('invoice_incomeacc.util.get_default_income_account', {
            company: frm.doc.company


        }).then(r => {
            console.log(r.message);
            let default_income_account = r.message;
            let income_account = "";

            if (frm.doc.taxes_and_charges) {
               
                frappe.call('invoice_incomeacc.util.get_income_account', {
                    company: frm.doc.company,
                    sales_tax_t: frm.doc.taxes_and_charges,

                }).then(r => {
                    console.log(r.message);
                    income_account = r.message;
                    let i = 0
                    if(income_account){
                    for (; i < frm.doc.items.length; i++) {
                        console.log(income_account);
                        if (default_income_account === frm.doc.items[i].income_account) {
                            frm.doc.items[i].income_account = income_account;
                        }
                    }}
                });
            };
        });

    },

});