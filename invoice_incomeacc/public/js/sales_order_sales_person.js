frappe.ui.form.on("Sales Order", {
    onload: function (frm) {
        //Based on logged user Gets his full name and from full name finds Sales person -> adds to sales team tables 
        if (!frm.doc.sales_team) {
        var child = frm.add_child("sales_team");
				child.sales_person = frappe.user_info().fullname
				child.allocated_percentage = "100"
			    frm.refresh_field('sales_team')}

    } ,
	
});