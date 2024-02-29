import sys
from pornhub_api import PornhubApi
from xvideos_api.xvideos_api import Client, Quality, threaded
from xvideos_api.xvideos_api import Client, Quality, threaded
# Initialize a Client object
api = PornhubApi()
client = Client()

search_query = ' '.join(sys.argv[1:])
# Fetch a video
video_object = client.get_video(f"{search_query}")

# Information from Video objects
print(video_object.title)
print(video_object.likes)
# Download the video

video_object.download(downloader=threaded, quality=Quality.BEST, output_path=f"./tmp/videos/{search_query}")

