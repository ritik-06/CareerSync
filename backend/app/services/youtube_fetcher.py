# from googleapiclient.discovery import build
# from serpapi import GoogleSearch
# import requests
# import requests
# from typing import List, Optional
# from app.config import GOOGLE_API_KEY, SERPAPI_API_KEY


# # from serpapi.google_search import GoogleSearch
# from app.config import GOOGLE_API_KEY, SERPAPI_API_KEY

# # def get_youtube_links(skills):
# #     youtube = build("youtube", "v3", developerKey=GOOGLE_API_KEY)
# #     results = []
# #     for skill in skills:
# #         req = youtube.search().list(q=f"{skill} tutorial", part="snippet", maxResults=1)
# #         res = req.execute()
# #         for item in res["items"]:
# #             video_id = item["id"]["videoId"]
# #             results.append(f"https://www.youtube.com/watch?v={video_id}")
# #     return results

# def get_youtube_links(skills: Optional[List[str]]) -> Optional[List[str]]:
#     if not skills:
#         return []

#     youtube_links: List[str] = []

#     for skill in skills:
#         search_query = f"{skill} tutorial"
#         response = requests.get(
#             "https://www.googleapis.com/youtube/v3/search",
#             params={
#                 "part": "snippet",
#                 "q": search_query,
#                 "type": "video",
#                 "key": YOUTUBE_API_KEY,
#                 "maxResults": 2,
#             },
#         )
#         results = response.json().get("items", [])

#         for item in results:
#             video_id = item.get("id", {}).get("videoId")
#             if video_id:
#                 video_url = f"https://www.youtube.com/watch?v={video_id}"
#                 youtube_links.append(video_url)

#     return youtube_links

# def get_serpapi_links(skills):
#     results = []
#     for skill in skills:
#         search = GoogleSearch({
#             "q": f"{skill} course",
#             "api_key": SERPAPI_API_KEY
#         })
#         data = search.get_dict()
#         for result in data.get("organic_results", [])[:1]:
#             results.append(result["link"])
#     return results


import requests
from googleapiclient.discovery import build
from serpapi import GoogleSearch
from typing import List, Optional
from app.config import GOOGLE_API_KEY, SERPAPI_API_KEY

def get_youtube_links(skills: Optional[List[str]]) -> Optional[List[str]]:
    if not skills:
        return []

    youtube_links: List[str] = []

    for skill in skills:
        search_query = f"{skill} full tutorial"
        response = requests.get(
            "https://www.googleapis.com/youtube/v3/search",
            params={
                "part": "snippet",
                "q": search_query,
                "type": "video",
                "key": GOOGLE_API_KEY,
                "maxResults": 2,
            },
        )
        results = response.json().get("items", [])

        for item in results:
            video_id = item.get("id", {}).get("videoId")
            if video_id:
                video_url = f"https://www.youtube.com/watch?v={video_id}"
                youtube_links.append(video_url)

    return youtube_links

def get_serpapi_links(skills: Optional[List[str]]) -> Optional[List[str]]:
    if not skills:
        return []

    results = []
    for skill in skills:
        search = GoogleSearch({
            "q": f"{skill} course",
            "api_key": SERPAPI_API_KEY
        })
        data = search.get_dict()
        for result in data.get("organic_results", [])[:1]:
            results.append(result["link"])
    return results
