<?php namespace Application\Ghost;

use Andesite\DBAccess\Connection\Filter\Filter;

class Precondition extends PreconditionGhost{

	public static function set($subjectId, array $preconditionIds){
		$access = static::$model->connection->createSmartAccess();
		$access->delete('precondition', Filter::where('subjectId=$1', $subjectId)->andIf(count($preconditionIds), 'preconditionSubjectId not in ($1)', $preconditionIds));
		foreach ($preconditionIds as $preconditionId) $access->insert('precondition', ['subjectId' => $subjectId, 'preconditionSubjectId' => $preconditionId], true);
	}
	public static function getPreconditionIds($subjectId){
		return static::$model->connection->createSmartAccess()->getValues("select preconditionSubjectId from precondition where subjectId = $1", $subjectId);
	}
}
