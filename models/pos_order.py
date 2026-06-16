from odoo import fields, models

class PosOrder(models.Model):
    _inherit = 'pos.order'

    doctor_id = fields.Many2one('pharmacy.doctor', string="Prescriber")