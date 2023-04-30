package keeper

import (
	"Corechain/x/corechain/types"
)

var _ types.QueryServer = Keeper{}
