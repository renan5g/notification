import { NotificationsRepository } from '@application/repositories';
import { Notification } from '@domain/entities';
import { Injectable } from '@nestjs/common';

interface CancelNotificationRequest {
  notification: Notification;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest
  ): Promise<CancelNotificationResponse> {
    const { notification } = request;

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
