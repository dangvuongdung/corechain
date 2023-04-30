package corechain_test

import (
	"testing"

	keepertest "Corechain/testutil/keeper"
	"Corechain/testutil/nullify"
	"Corechain/x/corechain"
	"Corechain/x/corechain/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.CorechainKeeper(t)
	corechain.InitGenesis(ctx, *k, genesisState)
	got := corechain.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
