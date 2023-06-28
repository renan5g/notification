import { NotificationsRepository } from '@application/repositories';
import { NotificationNotFound } from '@application/use-cases/errors';
import { Notification } from '@domain/entities';
import { Injectable } from '@nestjs/common';

interface GetNotificationRequest {
  notificationId: string;
}

type GetNotificationResponse = {
  notification: Notification;
};

@Injectable()
export class GetNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetNotificationRequest
  ): Promise<GetNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    return { notification };
  }
}
