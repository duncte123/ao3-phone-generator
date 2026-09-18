import type { PhoneContent } from '@/types/PhoneContent.ts'
import { htmlEntities } from '@/utils/textUtils.ts'

export function getStyle(): string {
  // language=css
  return `
#workskin .phone {
    max-width: 400px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    display: table;
    margin: auto;
}

#workskin .header {
    min-width: 400px;
    background-color: #f6f6f6;
    border-bottom: 1px solid #b2b2b2;
    color: #000000;
    font-weight: bold;
    padding-bottom: .5em;
    padding-top: .5em;
    margin-left: -.5em;
    margin-right: -.5em;
    margin-bottom: -2em;
    text-align: center;
    text-transform: capitalize;
    display: table;
}

#workskin .messagebody {
    background-color: #FFFFFF;
    display: table;
    padding-left: .5em;
    padding-right: .5em;
}

#workskin .text {
    float: left;
    color: #000000;
    margin: 0 0 0.5em;
    border-radius: 1em;
    padding: 0.5em 1em;
    background: #e5e5ea;
    max-width: 75%;
    clear: both;
    position: relative;
}

#workskin .text::after {
    content: "";
    position: absolute;
    left: -.5em;
    bottom: 0;
    width: 0.5em;
    height: 1em;
    border-right: 0.5em solid #e5e5ea;
    border-bottom-right-radius: 1em 0.5em;
}

#workskin .breply {
    float: right;
    color: #FFFFFF;
    margin: 0 0 0.5em;
    border-radius: 1em;
    padding: 0.5em 1em;
    background: #1289fe;
    max-width: 75%;
    clear: both;
    position: relative;
}

#workskin .breply::after {
    content: "";
    position: absolute;
    right: -0.5em;
    bottom: 0;
    width: 0.5em;
    height: 1em;
    border-left: 0.5em solid #1289fe;
    border-bottom-left-radius: 1em 0.5em;
}

#workskin .time {
    min-width: 395px;
    color: #7B7C80;
    font-size: .75em;
    padding-bottom: .5em;
    padding-top: .5em;
    margin-left: -.5em;
    margin-right: -.5em;
    margin-bottom: -.5em;
    text-align: center;
    display: table;
}

#workskin .grouptext {
    color: #7B7C80;
    font-size: .75em;
    padding-bottom: .5em;
    padding-top: 0;
    margin-left: .5em;
    margin-bottom: -2.5em;
    text-align: left;
    display: table;
    clear: both;
}

#workskin .hide {
    display: none;
}

#workskin .image {
    float: right;
    margin: 0 0 0.5em;
    border-radius: 1em;
    width: 50%;
    min-height: 75%;
    clear: both;
    position: relative;
    background-repeat: no-repeat;
    background-size: 100%;
    display: inline-block;
}
`;
}

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
        content.push(
          `<span class="time"><strong>${cfg.day}</strong> ${cfg.time}</span><br/>`,
        );
        break;
      }

      case 'img': {
        content.push(
          `<a href="${cfg.url}" target="_blank"><img src="${cfg.url}" alt="${cfg.desc}" title="${cfg.desc}" width="50%" class="image" /></a><br />`,
        );
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
