import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { phoneMissingErrors } from 'src/app/guards/phoneMasks.guard';
import {
  MessageService,
  messagesType,
} from 'src/app/services/messageService/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('messageBubbles', { read: ElementRef })
  messageBubblesRef!: ElementRef;

  @Output() updateMessage = new EventEmitter();

  messages: Array<messagesType> = null;
  new_message: string = '';
  phone_number: string = '';
  server_error: string = '';
  constructor(private messageService: MessageService) {
    this.messageService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });

    this.messageService.getErrors().subscribe((errors) => {
      this.server_error = errors;
    });

    this.messageService.loadMessages();
  }

  onSendMessage() {
    if (this.new_message.trim() == '' || this.phone_number == '') {
      return alert('Please enter a message');
    }
    const phoneErrors = phoneMissingErrors(this.phone_number);
    if (phoneErrors !== '') {
      return alert(phoneErrors);
    }
    this.messageService.sendMessage({
      phone_number: this.phone_number,
      body: this.new_message,
    });
    this.new_message = '';
  }
}
