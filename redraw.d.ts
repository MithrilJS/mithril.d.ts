import { redraw, render } from ".";

declare namespace RedrawService {
	export interface Static {
		render: typeof render;
		redraw: typeof redraw;
	}
}

declare const RedrawService: RedrawService.Static;
export = RedrawService;
