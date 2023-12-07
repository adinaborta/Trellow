"use client";

import React from "react";
import Head from "next/head";
import * as snippet from "@segment/snippet";

function renderSnippet() {
  const opts = {
    apiKey: "h1WR12juzHGaBHXePgbFFGI0kwHJorUH",
    page: true,
  };
  console.log(snippet.max(opts));
  return snippet.max(opts);
  // return "foo";
}

export default function CustomHead() {
  return (
    <Head>
      <script dangerouslySetInnerHTML={{ __html: renderSnippet() }} />
    </Head>
  );
}
