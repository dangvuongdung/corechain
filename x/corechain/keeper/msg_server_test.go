package keeper_test

import (
	"context"
	"testing"

	keepertest "Corechain/testutil/keeper"
	"Corechain/x/corechain/keeper"
	"Corechain/x/corechain/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.CorechainKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
