import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const urlimg = searchParams.get("url");
  // console.log(urlimg);
  // const gambardb = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/0z6RAAAAABJRU5ErkJggg==`

  try {
    const response = await fetch(`${urlimg}`, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        priority: "u=0, i",
        referer: "https://komiku.org/",
        "sec-ch-ua": '"Google Chrome";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-site",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        // cookie:
        //   "__ddgid_=TmV1TUqec2DwpLVa; __ddgmark_=AT8WEP3qy7Yk72IN; __ddg5_=eeExwuROjTAMcTmc; __ddg1_=lkwpxmUlhsMbkUpCwrxi; __ddg9_=114.10.47.160; _ga=GA1.1.1550474259.1782535530; _ga_ZEY1BX76ZS=GS2.1.s1782535530$o1$g1$t1782535867$j60$l0$h0; __ddg8_=iF8AQQL024oXEHHV; __ddg10_=1782535868",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const imageBlob = await response.blob();
    // const imageObjectURL = URL.createObjectURL(imageBlob);
    return new Response(imageBlob, {
      headers: {
        "Content-Type": imageBlob.type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(error);
    const gambardb = `iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/0z6RAAAAABJRU5ErkJggg==`;
    const buffer = Buffer.from(gambardb, "base64");
    return new Response(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // return new Response(buffer, {
  //   headers: {
  //     "Content-Type": "image/png",
  //     // cache browser
  //     "Cache-Control": "public, max-age=31536000, immutable",
  //   },
  // });
}
