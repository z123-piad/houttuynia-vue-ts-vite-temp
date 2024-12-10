
/**
 *
 * @param type
 * @param msg
 * @returns
 */
export const HMessage = (type: HMessageType, msg: string) => {
    return console[String(type)](msg);
}

export enum HMessageType {
    ERROR = 'error',
}