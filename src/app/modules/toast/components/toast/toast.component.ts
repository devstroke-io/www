import { Component, OnInit } from '@angular/core';
import {Toast} from '../../models/toast.model';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  public toasts: Toast[];

  constructor(private toastService: ToastService) {
    this.toasts = toastService.toasts;
  }

  ngOnInit() {
  }

}
