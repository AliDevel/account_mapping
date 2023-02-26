frappe.ui.form.on("Quotation", {
    onload: function (frm) {
        //Based on logged user Gets his full name and from full name finds Sales person -> adds to sales team tables 
        if (!frm.doc.sales_contributions_and_incentives) {
        var child = frm.add_child("sales_contributions_and_incentives");
				child.sales_person = frappe.user_info().fullname
				child.allocated_percentage = "100"
			    frm.refresh_field('sales_contributions_and_incentives')}

    } ,
	
});