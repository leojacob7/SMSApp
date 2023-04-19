import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { formatDate } from 'src/app/guards/phoneMasks.guard';
import { messagesType } from 'src/app/services/messageService/message.service';

@Component({
  selector: 'app-message-bubbles',
  templateUrl: './message-bubbles.component.html',
  styleUrls: ['./message-bubbles.component.css'],
})
export class MessageBubblesComponent {
  @ViewChildren('messageBody') msgBodyElements: QueryList<ElementRef>;
  @Input() message: messagesType = null;
  @Input() phone_number: string = null;
  @Input() created_at: string = null;

  constructor() {
    this.created_at = formatDate(this.created_at);
  }

  ngAfterViewInit() {
    const lastMsgEl = this.msgBodyElements.last.nativeElement as HTMLElement;
    lastMsgEl.scrollIntoView();
  }

  public formatDateTime(dateTimeString: string) {
    return formatDate(dateTimeString);
  }
}
