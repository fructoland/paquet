/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps, Handlers } from "$fresh/server.ts";
import Root from "../components/Root.tsx";
import Header from "../components/Header.tsx";
import Container from "../components/Container.tsx";
import { supabase } from "@supabase";
import type { App } from "../types/App.ts";
import AppListItem from "../components/AppListItem.tsx";
import Navbar from "../islands/Navbar.tsx";
import { categories } from "../utils/categories.ts";
import Button from "../components/Button.tsx";


export default function Home(props: PageProps) {
	return (
		<Root>
			<Navbar
				rightIcon="settings"
				rightIconHref="/settings"
			/>
			<Container style={{ height: 1024 }}>
				<Header className={tw`mb-4`}>
					Home
				</Header>
				<div 
					className={tw`flex flex-row gap-2 mb-4`}
				>
					{categories.map(category => (
						<Button
							key={category.id}
							icon={category.icon}
						>
							{category.name}
						</Button>
					))}
				</div>
				{props.data?.map((app: App) => (
					<AppListItem
						app={app}
					/>
				))}
			</Container>
		</Root>
	);
}

export const handler: Handlers = {
	async GET(_, ctx) {
		const { data: apps } = await supabase.from("apps").select("*");

		return ctx.render(apps);
	}
}