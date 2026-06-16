/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import { Component } from "@odoo/owl";
import { SelectionPopup } from "@point_of_sale/app/utils/input_popups/selection_popup";
import { AlertDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { Order } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";
import { ActionpadWidget } from "@point_of_sale/app/screens/product_screen/action_pad/action_pad";

export class DoctorButton extends Component {
    static template = "pharmacy_management_system.DoctorButton";

    setup() {
        this.pos = useService("pos");
        this.dialog = useService("dialog");
        this.orm = useService("orm");
    }

    async onClick() {
        try {
            // IMPORTANT: Change 'is_doctor' to the exact name of the checkbox field 
            // you use to identify doctors in your contact (res.partner) form.
            const domain = [['is_doctor', '=', true]]; 
            
            // Fetch doctors dynamically from the res.partner table
            const doctors = await this.orm.searchRead("res.partner", domain, ["id", "name"]);

            if (!doctors || doctors.length === 0) {
                return this.dialog.add(AlertDialog, {
                    title: _t("No Doctors Found"),
                    body: _t("Please ensure doctors are created and properly checked as a prescriber in the Contacts/Pharmacy module."),
                });
            }

            const list = doctors.map((doc) => ({
                id: doc.id,
                label: doc.name,
                item: doc,
            }));

            this.dialog.add(SelectionPopup, {
                title: _t("Select Prescribing Doctor"),
                list: list,
                getPayload: (selectedDoctor) => {
                    if (selectedDoctor && selectedDoctor.id) {
                        this.pos.get_order().doctor_id = selectedDoctor.id;
                        console.log("Doctor successfully attached to order:", selectedDoctor.label);
                    }
                }
            });
        } catch (error) {
            console.error("Error fetching doctors:", error);
            this.dialog.add(AlertDialog, {
                title: _t("Network Error"),
                body: _t("Could not connect to the database or the model field is incorrect. Check your console logs."),
            });
        }
    }
}

// Register the component so the XML can render it
ActionpadWidget.components = { ...ActionpadWidget.components, DoctorButton };

// Safely patch the Order model to include doctor_id
if (Order) {
    patch(Order.prototype, {
        setup(_default_obj, options) {
            super.setup(...arguments);
            this.doctor_id = this.doctor_id || null;
        },
        export_as_JSON() {
            const json = super.export_as_JSON(...arguments);
            json.doctor_id = this.doctor_id;
            return json;
        },
        init_from_JSON(json) {
            super.init_from_JSON(...arguments);
            this.doctor_id = json.doctor_id;
        },
    });
}