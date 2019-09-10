import { Component, OnInit, Input } from '@angular/core';
import { format, addDays } from 'date-fns';

@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent implements OnInit {
  senderName = "Amazon Delivery";
  senderLogo = 'assets/images/amazon.jpg';
  senderAdress = '795 Folsom Ave, Suite 600, San Francisco, CA, 94107';
  senderEmail = 'example@amazon.com';
  senderPhone = '(123) 456-7890';
  senderFax = '800-692-7753';
  invoiceNumber = `CRM${(~~(Math.random() * 1e8)).toString(16)}`;
  invoiceDate = format(new Date(), 'MM dd, yyyy');
  invoiceDueDate = format(addDays(new Date(), 5), 'MM dd, yyyy');

  @Input() data: any = {}
  constructor() {}
  ngOnInit() {}
}
