import { ComponentGridContainer, ComponentTitle, ComponentWrapper } from "../../common/typography";

export default function SiteRecentlyAdded() {
  return (
    <ComponentWrapper>
      <ComponentTitle title="Recently Added Dishes" />
      <ComponentGridContainer>product</ComponentGridContainer>
    </ComponentWrapper>
  );
}
