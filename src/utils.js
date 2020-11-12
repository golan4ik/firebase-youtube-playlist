import db from "./fbConfig";
import moment from "moment";

export const getVideoId = (string = "") => {
  try {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = string.match(regExp);
    //console.log(match);
    return match && match[7].length === 11 ? match[7] : null;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

export const getVideoUrl = (videoId, part = "snippet") => {
  return `https://youtube.googleapis.com/youtube/v3/videos?part=${part}&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
};

const getSnippet = (url) => {
  return fetch(url, {})
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      if (data.items.length === 0) return null;
      const { channelTitle, title, thumbnails } = data?.items[0]?.snippet;

      return {
        channelTitle,
        title,
        thumbnail: thumbnails.default,
      };
    })
    .catch((e) => null);
};

const getContentDetails = (url) => {
  return fetch(url, {})
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      if (data.items.length === 0) return null;
      const { duration } = data?.items[0]?.contentDetails;
      const seconds = youtubeDurationToSeconds(duration);
      const durationStr = moment("2000-01-01")
        .startOf("day")
        .seconds(seconds)
        .format("H:mm:ss");

      return {
        duration: durationStr,
      };
    })
    .catch((e) => null);
};

export const getVideoData = async (string) => {
  const videoId = getVideoId(string);
  const snippetUrl = getVideoUrl(videoId, "snippet");
  const contentDetailsUrl = getVideoUrl(videoId, "contentDetails");

  try {
    /**
     * Run in parallel to save time
     */
    const results = await Promise.all([
      getSnippet(snippetUrl),
      getContentDetails(contentDetailsUrl),
    ]);

    return {
      ...results[0],
      ...results[1],
      videoId,
    };
  } catch (e) {
    return null;
  }
};

export const parseSnapshot = (snapshot) => {
  const docs = [];
  snapshot.docs.forEach((doc) => {
    docs.push({ id: doc.id, ...doc.data() });
  });

  return sortItemsByDate(docs);
};

/* export const isFirstSnapshot = (snapshot) => {
  let result = true;

  snapshot.docChanges().forEach(function (change) {
    result = result && change.type === "added";
  });

  return result;
}; */

/* export const getNewDocFromSnapshot = (snapshot) => {
  let doc = null;

  snapshot.docChanges().forEach(function (change) {
    if (change.type === "added" && snapshot.docChanges().length === 1) {
      doc = change.doc.data();
    }
  });

  return doc;
}; */

export const addDocumentToDb = (obj) => {
  return db
    .collection("playlist")
    .add(obj)
    .then(function () {
      //console.log("Document successfully written!");
      return true;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      return false;
    });
};

export const removeDocumentFromDb = (obj) => {
  //console.log('removing: ', obj);
  return db
    .collection("playlist")
    .doc(obj.id)
    .delete()
    .then(function () {
      console.log("Document successfully removed!");
      return true;
    })
    .catch(function (error) {
      console.error("Error deleting document: ", error);
      return false;
    });
};

export const sortItemsByDate = (items = []) => {
  //console.log(items);
  items.sort(function compare(a, b) {
    var dateA = new Date(a.createdAt?.seconds);
    var dateB = new Date(b.createdAt?.seconds);
    return dateA - dateB;
  });

  return items;
};

const youtubeDurationToSeconds = (duration) => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  duration = duration.replace("PT", "");

  if (duration.indexOf("H") > -1) {
    let hours_split = duration.split("H");
    hours = parseInt(hours_split[0]);
    duration = hours_split[1];
  }

  if (duration.indexOf("M") > -1) {
    let minutes_split = duration.split("M");
    minutes = parseInt(minutes_split[0]);
    duration = minutes_split[1];
  }

  if (duration.indexOf("S") > -1) {
    let seconds_split = duration.split("S");
    seconds = parseInt(seconds_split[0]);
  }

  return hours * 60 * 60 + minutes * 60 + seconds;
};
