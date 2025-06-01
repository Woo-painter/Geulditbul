import SideItem from "./SideItem";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSpellChecker,
  toggleSynonym,
  toggleReference,
} from "../redux/onoff";
import { fetchPosts } from "../redux/post";
import { useEffect } from "react";
import TextItem from "./TextItem";
import NewPostInput from "./NewPostInput";
import { useState } from "react";

export default function SideItems() {
  const onoff = useSelector((state) => state.onoff.value);
  const posts = useSelector((state) => state.posts.items);
  const loading = useSelector((state) => state.posts.loading);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div className="flex flex-col py-1">
      <div className="text-[9px] px-3">서비스</div>
      <div>
        <ul>
          <li className="">
            <SideItem
              image={"spellChecker.png"}
              text={`맞춤법검사`}
              action={() => dispatch(toggleSpellChecker())}
              on={onoff.spellChecker}
            />
          </li>
          <li className="">
            <SideItem
              image={"synonymRecommend.png"}
              text={`유의어추천`}
              action={() => dispatch(toggleSynonym())}
              on={onoff.synonym}
            />
          </li>
          <li className="">
            <SideItem
              image={"recommend.png"}
              text={"참고문헌추천"}
              action={() => dispatch(toggleReference())}
              on={onoff.reference}
            />
          </li>
        </ul>
      </div>
      <div className="text-[9px] px-3">글 목록</div>
      <div>
        <ul>
          {loading ? (
            <div>Loading...</div>
          ) : posts && posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.post_id}>
                <TextItem
                  image="text.png"
                  text={post.title}
                  on={selectedId === post.post_id}
                  id={post.post_id}
                  onClick={() => setSelectedId(post.post_id)}
                />
              </li>
            ))
          ) : (
            <li>글이 없습니다</li>
          )}
        </ul>
        <NewPostInput onSuccess={() => dispatch(fetchPosts())} />
      </div>
    </div>
  );
}
