import { Injectable } from '@angular/core';
import { toast } from 'sonner';
import { MessageStatusEnum } from '../enums/messagestatus.enum';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {

  addToaster(
    severity: MessageStatusEnum,
    message: string,
    detail?: string
  ): void {

    const description = detail ?? '';

    switch (severity) {
      case MessageStatusEnum.Success:
        toast.success(message, {
          description,
          duration: 3000
        });
        break;

      case MessageStatusEnum.Error:
        toast.error(message, {
          description,
          duration: 3000
        });
        break;

      case MessageStatusEnum.Warning:
        toast.warning(message, {
          description,
          duration: 3000
        });
        break;

      case MessageStatusEnum.Info:
      default:
        toast.info(message, {
          description,
          duration: 3000
        });
        break;
    }
  }
}