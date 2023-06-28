import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import {
  CancelNotification,
  GetNotification,
  ReadNotification,
  SendNotification,
} from '@application/use-cases';
import { CreateNotificationRequest } from '@infra/http/requests';
import { NotificationResource } from '@infra/http/resources';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private getNotification: GetNotification,
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification
  ) {}

  @Get(':id')
  async show(@Param('id') id: string) {
    const { notification } = await this.getNotification.execute({
      notificationId: id,
    });

    return {
      notification: NotificationResource.toHTTP(notification),
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    const { notification } = await this.getNotification.execute({
      notificationId: id,
    });

    await this.cancelNotification.execute({
      notification,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    const { notification } = await this.getNotification.execute({
      notificationId: id,
    });

    await this.readNotification.execute({
      notification,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationRequest) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationResource.toHTTP(notification),
    };
  }
}
