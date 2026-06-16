# -- coding: utf-8 --

##############################################################################
#                                                                            #
# Part of WebbyCrown Solutions (Website: www.webbycrown.com).                #
# Copyright © 2025 WebbyCrown Solutions. All Rights Reserved.                #
#                                                                            #
# This module is developed and maintained by WebbyCrown Solutions.           #
# Unauthorized copying of this file, via any medium, is strictly prohibited. #
# Licensed under the terms of the WebbyCrown Solutions License Agreement.    #
#                                                                            #
##############################################################################

{
    'name': 'Odoo Pharmacy management system — Hospital Multi-Branch Prescriptions, Dispensing & Controlled Drugs',
    'version': '18.0.1.0.0',
    'summary': 'Hospital multi-branch pharmacy management with prescriptions, claims, and controls',
    'author': 'Webbycrown Solutions',
    'website': 'www.webbycrown.com',
    'category': 'Industries/Healthcare',
    'license': 'LGPL-3',
    'depends': [
        'base', 'contacts', 'mail', 'web', 'portal', 'board',
        'product', 'stock', 'stock_account', 'uom', 'point_of_sale',
        'sale_management', 'account'
    ],
    'data': [
        'security/pharmacy_security.xml',
        'security/ir.model.access.csv',
        'data/sequences.xml',
        'data/demo.xml',
        'views/reporting_views.xml',
        'views/hospital_views.xml',
        'views/patient_views.xml',
        'views/doctor_prescriber_views.xml',
        'views/pharmacy_views.xml',
        'views/availability_views.xml',
        'views/drug_views.xml',
        'views/prescription_views.xml',
        'views/insurance_views.xml',
        'views/alert_views.xml',
        'views/portal_views.xml',
        'views/controlled_views.xml',
        'views/treatment_views.xml',
        'views/dashboard_views.xml',
        'views/menu.xml',
    ],
    'demo': [
        'data/demo.xml',
        'data/demo_expanded.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'pharmacy_management_system/static/src/scss/pharma_kanban.scss',
            'pharmacy_management_system/static/src/scss/dashboard.scss', 
            'pharmacy_management_system/static/src/js/dashboard.js',       
            'pharmacy_management_system/static/src/xml/dashboard.xml',
            

        ],
        'point_of_sale._assets_pos': [
            # Placeholder: JS to enforce lot/FEFO in POS; to be added later
            'pharmacy_management_system/static/src/js/doctor_button.js',
            'pharmacy_management_system/static/src/xml/doctor_button.xml',
        ],
    },
    'images': ['static/description/main_screenshot.png'],
    'icon': 'dynamic_custom_odoo_form_builde/static/description/icon.png',
    'application': True,
    'installable': True,
    'post_init_hook': 'post_init_hook',
}
