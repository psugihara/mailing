import { apiLogin } from "../../../../__integration__/util/login";
import { apiCreateList } from "../../../../__integration__/util/lists";
import {
  apiGetListMembers,
  apiCreateListMember,
  apiPatchListMember,
  apiGetListMember,
} from "../../../../__integration__/util/listMember";
import prisma from "../../../../../../../prisma";

describe("lists/[id]/members", () => {
  describe("not logged in", () => {
    it("GET /lists/noid/members should 404", async () => {
      const { response } = await apiGetListMembers("noid");
      expect(response.status).toBe(404);
    });
  });

  describe("logged in", () => {
    let listId: string;
    let memberId: string;

    beforeAll(async () => {
      await apiLogin();

      // create a list
      const { response: createListResponse } = await apiCreateList();
      expect(createListResponse.status).toBe(201);
      const data = await createListResponse.json();

      listId = data.list.id;
      expect(typeof listId).toBe("string");

      // create a list member
      const { formData, response: createListMemberResponse } =
        await apiCreateListMember(listId);

      expect(createListMemberResponse.status).toBe(201);

      const email = formData.email;

      const member = await prisma.member.findUniqueOrThrow({
        where: { listId_email: { listId, email } },
      });

      memberId = member.id;
    });

    it("should refuse to update the list members status if it is not in the list", async () => {
      expect(memberId).toBeDefined();

      const { response: patchListMemberResponse } = await apiPatchListMember(
        listId,
        memberId,
        {
          status: "this is invalid",
        }
      );

      expect(patchListMemberResponse.status).toBe(422);
    });

    it("should update the list members status", async () => {
      // check that the initial state of the "status" field on member is "subscribed"
      const { response: getInitialListMemberResponse } = await apiGetListMember(
        listId,
        memberId
      );

      expect(getInitialListMemberResponse.status).toBe(200);
      const initialData = await getInitialListMemberResponse.json();
      expect(typeof initialData.member).toBe("object");
      expect(initialData.member.status).toBe("subscribed");

      // PATCH it to be "unsubscribed"
      const { response: patchListMemberResponse } = await apiPatchListMember(
        listId,
        memberId,
        {
          status: "unsubscribed",
        }
      );

      expect(patchListMemberResponse.status).toBe(200);

      // check that the "status" field on member has been updated to "unsubscribed"
      const { response: getListMemberResponse } = await apiGetListMember(
        listId,
        memberId
      );

      expect(getListMemberResponse.status).toBe(200);
      const data = await getListMemberResponse.json();
      expect(data.member.status).toBe("unsubscribed");
    });
  });
});
