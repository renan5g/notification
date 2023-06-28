import { NotificationsRepository } from '@application/repositories';
import { Notification } from '@domain/entities';
import { Injectable } from '@nestjs/common';

interface ReadNotificationRequest {
  notification: Notification;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest
  ): Promise<ReadNotificationResponse> {
    const { notification } = request;

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
