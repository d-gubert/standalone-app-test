import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IMessageExtender,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IMessage, IPreMessageSentExtend } from '@rocket.chat/apps-engine/definition/messages';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { UIKitSurfaceType } from '@rocket.chat/apps-engine/definition/uikit';
import { ButtonElement } from '@rocket.chat/ui-kit';
import { URL } from 'url';

export class HttpTestApp extends App implements IPreMessageSentExtend {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    executePreMessageSentExtend(message: IMessage, extend: IMessageExtender, read: IRead, http: IHttp, persistence: IPersistence): Promise<IMessage> {
        extend.addAttachment({
            text: 'test',
        });

        return Promise.resolve(extend.getMessage());
    }

    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        configuration.slashCommands.provideSlashCommand({
            command: 'http-test',
            i18nDescription: 'http-test-desc',
            i18nParamsExample: 'http-test-example',
            providesPreview: false,
            executor: async (context, read, modify, http, persis) => {
                console.log(URL);
                return modify.getUiController().openSurfaceView({
                    type: UIKitSurfaceType.MODAL,
                    title: {
                        type: 'plain_text',
                        text: 'Test',
                    },
                    blocks: [
                        {
                            type: 'input',
                            blockId: 'test',
                            element: {
                                appId: this.getID(),
                                blockId: 'test',
                                type: 'plain_text_input',
                                actionId: 'test',
                            },
                            label: {
                                type: 'plain_text',
                                text: 'Test',
                            },
                        },
                    ],
                    submit: {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: 'Submit',
                        },
                    } as ButtonElement,
                }, {triggerId: context.getTriggerId()!}, context.getSender());
                // await http.patch('http://localhost:8080', {headers: { 'Content-Type': 'application/json' }, data: {test: 'test'}});
            },
        })
    }
}
