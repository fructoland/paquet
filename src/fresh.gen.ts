// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_certificate_public_key from "./routes/api/certificate/public-key.ts";
import * as $api_image_proxy from "./routes/api/image-proxy.ts";
import * as $api_index from "./routes/api/index.ts";
import * as $app_id_ from "./routes/app/[id].tsx";
import * as $app_error from "./routes/app/error.tsx";
import * as $category_id_ from "./routes/category/[id].tsx";
import * as $category_index from "./routes/category/index.tsx";
import * as $docs_doc_ from "./routes/docs/[doc].tsx";
import * as $docs_index from "./routes/docs/index.tsx";
import * as $gfm_css from "./routes/gfm.css.ts";
import * as $home from "./routes/home.tsx";
import * as $index from "./routes/index.tsx";
import * as $kv_insights_middleware from "./routes/kv-insights/_middleware.ts";
import * as $offline from "./routes/offline.tsx";
import * as $privacy from "./routes/privacy.tsx";
import * as $search from "./routes/search.tsx";
import * as $settings from "./routes/settings.tsx";
import * as $terms_and_conditions from "./routes/terms-and-conditions.tsx";
import * as $Dialog from "./islands/Dialog.tsx";
import * as $InstallBanner from "./islands/InstallBanner.tsx";
import * as $KvInsightsEntriesManagement from "./islands/KvInsightsEntriesManagement.tsx";
import * as $KvInsightsEntryManagement from "./islands/KvInsightsEntryManagement.tsx";
import * as $KvInsightsQueueManagement from "./islands/KvInsightsQueueManagement.tsx";
import * as $Navbar from "./islands/Navbar.tsx";
import * as $settings_AnalyticsSwitch from "./islands/settings/AnalyticsSwitch.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
	routes: {
		"./routes/_app.tsx": $_app,
		"./routes/_middleware.ts": $_middleware,
		"./routes/api/certificate/public-key.ts": $api_certificate_public_key,
		"./routes/api/image-proxy.ts": $api_image_proxy,
		"./routes/api/index.ts": $api_index,
		"./routes/app/[id].tsx": $app_id_,
		"./routes/app/error.tsx": $app_error,
		"./routes/category/[id].tsx": $category_id_,
		"./routes/category/index.tsx": $category_index,
		"./routes/docs/[doc].tsx": $docs_doc_,
		"./routes/docs/index.tsx": $docs_index,
		"./routes/gfm.css.ts": $gfm_css,
		"./routes/home.tsx": $home,
		"./routes/index.tsx": $index,
		"./routes/kv-insights/_middleware.ts": $kv_insights_middleware,
		"./routes/offline.tsx": $offline,
		"./routes/privacy.tsx": $privacy,
		"./routes/search.tsx": $search,
		"./routes/settings.tsx": $settings,
		"./routes/terms-and-conditions.tsx": $terms_and_conditions,
	},
	islands: {
		"./islands/Dialog.tsx": $Dialog,
		"./islands/InstallBanner.tsx": $InstallBanner,
		"./islands/KvInsightsEntriesManagement.tsx":
			$KvInsightsEntriesManagement,
		"./islands/KvInsightsEntryManagement.tsx": $KvInsightsEntryManagement,
		"./islands/KvInsightsQueueManagement.tsx": $KvInsightsQueueManagement,
		"./islands/Navbar.tsx": $Navbar,
		"./islands/settings/AnalyticsSwitch.tsx": $settings_AnalyticsSwitch,
	},
	baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
