import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css'],
})
export class SendMessageComponent {
  new_message: string = '';
  @Output() onSendMessageEmitter: EventEmitter<string> = new EventEmitter();

  onSendMessage() {
    this.onSendMessageEmitter.emit(this.new_message);
  }
}
