const { spawn } = require('child_process');
const jsonrpc = require('jsonrpc-lite');


const requestConstruct = JSON.stringify({"jsonrpc":"2.0","id":"98xe2xypqd9","method":"app:construct","params":[{"info":{"id":"78366d59-505e-4391-9f71-09a7d44cf42b","version":"0.0.1","requiredApiVersion":"^1.19.0","iconFile":"icon.png","author":{"name":"a","homepage":"a","support":"a"},"name":"HTTP test","nameSlug":"http-test","classFile":"HttpTestApp.js","description":"a","implements":["IPreMessageSentExtend"],"iconFileContent":"data:image/png;base64,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"},"files":{"HttpTestApp.js":"\"use strict\";Object.defineProperty(exports,\"__esModule\",{value:!0});exports.HttpTestApp=void 0;var r=require(\"@rocket.chat/apps-engine/definition/App\"),a=require(\"@rocket.chat/apps-engine/definition/uikit\"),o=require(\"url\"),p=class extends r.App{constructor(s,e,t){super(s,e,t)}executePreMessageSentExtend(s,e,t,n,i){return e.addAttachment({text:\"test\"}),Promise.resolve(e.getMessage())}async extendConfiguration(s,e){s.slashCommands.provideSlashCommand({command:\"http-test\",i18nDescription:\"http-test-desc\",i18nParamsExample:\"http-test-example\",providesPreview:!1,executor:async(t,n,i,l,d)=>{console.log(o.URL),await i.getUiController().openSurfaceView({type:a.UIKitSurfaceType.MODAL,title:{type:\"plain_text\",text:\"Test\"},blocks:[{type:\"input\",blockId:\"test\",element:{appId:this.getID(),blockId:\"test\",type:\"plain_text_input\",actionId:\"test\"},label:{type:\"plain_text\",text:\"Test\"}}],submit:{type:\"button\",text:{type:\"plain_text\",text:\"Submit\"}}},{triggerId:t.getTriggerId()},t.getSender())}})}};exports.HttpTestApp=p;\n"},"languageContent":{},"implemented":{"IPostMessageSentToBot":false,"IPreMessageSentPrevent":false,"IPreMessageSentExtend":true,"IPreMessageSentModify":false,"IPostMessageSent":false,"IPreMessageDeletePrevent":false,"IPostMessageDeleted":false,"IPreMessageUpdatedPrevent":false,"IPreMessageUpdatedExtend":false,"IPreMessageUpdatedModify":false,"IPostMessageUpdated":false,"IPostMessageReacted":false,"IPostMessageFollowed":false,"IPostMessagePinned":false,"IPostMessageStarred":false,"IPostMessageReported":false,"IPreRoomCreatePrevent":false,"IPreRoomCreateExtend":false,"IPreRoomCreateModify":false,"IPostRoomCreate":false,"IPreRoomDeletePrevent":false,"IPostRoomDeleted":false,"IPreRoomUserJoined":false,"IPostRoomUserJoined":false,"IPreRoomUserLeave":false,"IPostRoomUserLeave":false,"IPostExternalComponentOpened":false,"IPostExternalComponentClosed":false,"IUIKitInteractionHandler":false,"IUIKitLivechatInteractionHandler":false,"IPostLivechatRoomStarted":false,"IPostLivechatRoomClosed":false,"ILivechatRoomClosedHandler":false,"IPostLivechatAgentAssigned":false,"IPostLivechatAgentUnassigned":false,"IPostLivechatRoomTransferred":false,"IPostLivechatGuestSaved":false,"IPostLivechatRoomSaved":false,"IPreFileUpload":false,"IPreEmailSent":false,"IPostUserCreated":false,"IPostUserUpdated":false,"IPostUserDeleted":false,"IPostUserLoggedIn":false,"IPostUserLoggedOut":false,"IPostUserStatusChanged":false}}]}).concat('OkFQUF9TRVA6');

const requestIinitialize = JSON.stringify({"jsonrpc":"2.0","id":"0mi75ya6hdzd","method":"app:initialize","params":[]}).concat('OkFQUF9TRVA6');

const requestGetStatus = JSON.stringify({"jsonrpc":"2.0","id":"0mi75ya6hdzd","method":"app:getStatus","params":[]}).concat('OkFQUF9TRVA6');

const requestOnEnable = JSON.stringify({"jsonrpc":"2.0","id":"syt1rd481g","method":"app:onEnable","params":[]}).concat('OkFQUF9TRVA6');

const requestSetStatus = JSON.stringify({"jsonrpc":"2.0","id":"c8am8d6xlq","method":"app:setStatus","params":["auto_enabled"]}).concat('OkFQUF9TRVA6');

const requestSlashcommandExecutor = JSON.stringify({"jsonrpc":"2.0","id":"vz6a9vdi2b8","method":"slashcommand:http-test:executor","params":[{"sender":{"id":"wPCCoopayRFtxeoKw","username":"dgubert","emails":[{"address":"douglas.gubert@rocket.chat","verified":false}],"type":"user","isEnabled":true,"name":"Douglas Gubert","roles":["user","admin"],"status":"online","statusConnection":"online","utcOffset":-3,"createdAt":"2023-10-25T22:16:54.538Z","updatedAt":"2024-01-19T20:48:29.468Z","lastLoginAt":"2024-01-19T20:48:29.468Z","settings":{"preferences":{}}},"room":{"id":"GENERAL","slugifiedName":"general","type":"c","creator":{"id":"rocket.cat","username":"rocket.cat","type":"bot","isEnabled":true,"name":"Rocket.Cat","roles":["bot"],"status":"online","statusConnection":"undefined","utcOffset":0,"createdAt":"2023-10-25T22:15:40.946Z","updatedAt":"2023-10-25T22:15:41.100Z","settings":{"preferences":{}}},"isDefault":true,"isReadOnly":false,"displaySystemMessages":true,"messageCount":3,"createdAt":"2023-10-25T22:15:40.177Z","updatedAt":"2024-01-18T22:32:59.372Z","lastModifiedAt":"2024-01-18T22:32:59.329Z"},"params":[],"triggerId":"dJ7tPJyi8NhzPFuQh"}]}).concat('OkFQUF9TRVA6');

const responseNull = {"jsonrpc":"2.0","id":null,"result":null};

// Local configuration
// const appsEnginePath = '/home/douglas/dev/github.com/RocketChat/Rocket.Chat.Apps-engine';
// const denoScriptPath = `${appsEnginePath}/deno-runtime/main.ts`;
// const denoExecutable = 'deno';

// NPM configuration
const appsEnginePath = './node_modules/@rocket.chat/apps-engine';
const denoScriptPath = `${appsEnginePath}/deno-runtime/main.ts`;
const denoExecutable = './node_modules/@rocket.chat/apps-engine/node_modules/deno-bin/bin/deno';

const EOM = 'OkFQUF9TRVA6';

async function main() {
    const subprocess = spawn(denoExecutable, [
        'run',
        `--allow-read=${appsEnginePath}/`,
        '--inspect',
        denoScriptPath,
        '--subprocess',
        EOM,
    ]);

    subprocess.stdout.on('data', (data) => {
        console.log(new Date(), `INCOMING DENO: ${data}`);

        try {
            const message = jsonrpc.parse(data.toString().replace(EOM, ''));

            if (message.type === 'request' && message.payload.id) {
                console.log(new Date(), 'SENDING RESPONSE');
                subprocess.stdin.write(JSON.stringify(Object.assign({}, responseNull, { id: message.payload.id })) + EOM);
            }
        } catch (error) {
            console.error(new Date(), 'incoming deno message error:', error);
        }
    });

    subprocess.stderr.on('data', (data) => {
        console.error(new Date(), `DENO STDERR: ${data}`);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    subprocess.stdin.write(requestConstruct);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    subprocess.stdin.write(requestIinitialize);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    subprocess.stdin.write(requestGetStatus);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    subprocess.stdin.write(requestOnEnable);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    subprocess.stdin.write(requestSetStatus);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    subprocess.stdin.write(requestGetStatus);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    subprocess.stdin.write(requestSlashcommandExecutor);
}

main();
