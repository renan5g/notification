import { NotificationsRepository } from '@application/repositories';
import { Content, Notification } from '@domain/entities';
import { Injectable } from '@nestjs/common';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

type SendNotificationResponse = {
  notification: Notification;
};

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = Notification.create({
      recipientId,
      content: Content.create(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
