/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

class PharmacyDashboard extends Component {
    static template = "pharmacy_management_system.DashboardTemplate";

    setup() {
        this.action = useService("action");
        this.orm = useService("orm");
        this.state = useState({
            prescriptionCount: 0,
            shortageCount: 0,
            claimsCount: 0,
            expiringCount: 0,
        });

        onWillStart(async () => {
            const [rx, shortages, claims, expiring] = await Promise.all([
                this.orm.searchCount("pharmacy.prescription", []),
                this.orm.searchCount("pharmacy.drug.coverage", [["shortage_flag","=",true]]),
                this.orm.searchCount("pharmacy.insurance.claim", []),
                this.orm.searchCount("stock.lot", [["expiration_date","!=",false]]),
            ]);
            this.state.prescriptionCount = rx;
            this.state.shortageCount = shortages;
            this.state.claimsCount = claims;
            this.state.expiringCount = expiring;
        });
    }

    openAction(xmlId) {
        this.action.doAction(xmlId);
    }
}

registry.category("actions").add("pharmacy_management_system.Dashboard", PharmacyDashboard);