import type { PhoneContent } from '@/types/PhoneContent.ts'
import { htmlEntities } from '@/utils/textUtils.ts'

export function renderPhoneContent({ chatName, isGroup, recipient, messages }: PhoneContent): string {
  const content: string[] = [
    '<hr class="hide" />',
    '<div class="phone">',
    '<p class="messagebody">',
    `<span class="header"><span class="hide">Text chat with: </span>${chatName}</span><br/><br/>`,
  ];

  for (const cfg of messages) {
    switch (cfg.type) {
      case 'time': {
        break;
      }

      case 'img': {
        break;
      }

      case 'message': {
        if (isGroup && cfg.name !== recipient) {
          content.push(
            `<span class="grouptext">${cfg.name}<span class="hide">: </span></span><br/>`,
          );
        }

        // Blue bubbles for our own messages
        const replyClass = cfg.name === recipient ? 'breply' : 'text';
        const hiddenHtml = (isGroup && replyClass === 'text') ? '' : `<span class="hide"><strong>${cfg.name}: </strong></span>`;

        content.push(
          `<span class="${replyClass}">${hiddenHtml}${htmlEntities(cfg.text)}</span><br/>`,
        );
        break;
      }

      default:
        // ignore any unknowns
        break;
    }
  }

  content.push(
    '</p>',
    '</div>',
    '<hr class="hide"/>',
  );

  return content.join("\n");
}
