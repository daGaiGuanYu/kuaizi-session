import { IncomingMessage, ServerResponse } from 'http'

declare function getSession(req: IncomingMessage, res: ServerResponse): any
export = getSession