from odoo import models

class PosSession(models.Model):
    _inherit = 'pos.session'

    def _pos_ui_models_to_load(self):
        result = super()._pos_ui_models_to_load()
        # Ensure the doctor model is synced to the browser
        result.append('pharmacy.doctor')
        return result

    def _loader_params_pharmacy_doctor(self):
        return {
            'search_params': {
                'domain': [],
                'fields': ['name', 'doctor_id_code', 'specialty'],
            },
        }

    def _get_pos_ui_pharmacy_doctor(self, params):
        return self.env['pharmacy.doctor'].search_read(**params['search_params'])